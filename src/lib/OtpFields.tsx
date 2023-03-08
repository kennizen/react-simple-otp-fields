import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useEffect } from "react";
import styles from "../otp.module.css";

interface IProps {
    /**
     * Otp state that stores the input values in an array of strings.
     */
    otp: string[];
    /**
     * Number of input fields.
     * @default 2
     */
    length: number;
    /**
     * Executes automatically after all the input fields are populated.
     * @returns
     */
    onComplete?: () => void;
    /**
     * Executes after every input change. The populated inputs as an array
     * of strings and the index of the changed input, are provided in the arguments.
     * @param val
     * @param index
     * @returns
     */
    onChange: (val: string[], index?: number) => void;
    containerAttr?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    /**
     * The classnames for the container of the inputs.
     * @example
     * containerClasses="class1 class2 ..."
     */
    containerClasses?: string;
    inputAttr?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    /**
     * The classnames for the input.
     * @example
     * inputClasses="class1 class2 ..."
     */
    inputClasses?: string;
    /**
     * A react node placed between the input fields.
     */
    seperator?: React.ReactNode;
    /**
     * Defines the space between two adjacent input fields also takes into account the spacing for the seperator if a seperator is provided.
     */
    gap?: number | string;
}

export const OtpFields = ({
    otp,
    onComplete,
    length = 2,
    onChange,
    containerAttr,
    inputAttr,
    containerClasses,
    inputClasses,
    seperator,
    gap = 8,
}: IProps) => {
    /**
     * Function to handle the main logic for backspace character deletion, right movement,
     * left movement and to focus onto the next input
     * @param e
     * @param index
     * @returns
     */
    function handleKeyUp(e: React.KeyboardEvent<HTMLDivElement>, index: number) {
        const key = e.key;
        const ele = e.currentTarget;

        const prevSib = ele.previousSibling;
        const prevInput = prevSib?.childNodes[0] as HTMLInputElement;
        const nextSib = ele.nextSibling;
        const nextInput = nextSib?.childNodes[0] as HTMLInputElement;
        const value = (ele.children[0] as HTMLInputElement).value.trim();

        const arr = [...otp];

        switch (key) {
            case "Backspace":
                {
                    if (index === otp.length - 1) arr.pop();
                    else if (arr[index] !== undefined) arr[index] = "";

                    onChange(arr, index);

                    if (prevSib !== null) prevInput.focus();
                }
                break;
            case "ArrowLeft":
                if (prevSib !== null) prevInput.focus();
                break;
            case "ArrowRight":
                if (nextSib !== null) nextInput.focus();
                break;
            default: {
                if (value === "" || value === undefined || value === null) return;

                arr[index] = value;
                onChange(arr, index);

                if (nextSib === null) ele.blur();
                else nextInput.focus();
            }
        }
    }

    /**
     * Function to select the input value everytime an input is focused
     * @param e
     */
    function handleOnFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
        (e.target as HTMLInputElement).select();
    }

    // lifecycles
    useEffect(() => {
        if (checkIfEmpty(otp)) return;
        if (otp.length < length) return;
        onComplete?.();
    }, [otp]);

    return (
        <section
            style={{
                display: "flex",
                alignItems: "center",
                width: "min-content",
                flex: "0",
                columnGap: gap,
            }}
            className={`${containerClasses === undefined ? "" : containerClasses}`}
            {...containerAttr}
        >
            {new Array(Math.round(length)).fill("").map((e, i) => (
                <div
                    key={i}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: gap,
                    }}
                    onFocus={(e) => handleOnFocus(e)}
                    onKeyUp={(e) => handleKeyUp(e, i)}
                >
                    <input
                        style={{
                            textAlign: "center",
                            maxWidth: "7rem",
                        }}
                        defaultValue={otp[i] ?? ""}
                        type="text"
                        autoFocus={i === 0}
                        maxLength={1}
                        className={`${styles["fields"]} ${
                            inputClasses === undefined ? "" : inputClasses
                        }`}
                        {...inputAttr}
                    />
                    {seperator !== undefined && i < length - 1 ? <span>{seperator}</span> : <></>}
                </div>
            ))}
        </section>
    );
};

// utility fn
function checkIfEmpty(arr: string[]) {
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] === undefined || arr[index] === "") return true;
    }
    return false;
}
