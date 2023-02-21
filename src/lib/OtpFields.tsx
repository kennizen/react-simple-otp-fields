import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useEffect } from "react";
import styles from "./otp.module.css";

interface IProps {
    /**
     * Otp state that stores the input values in an array of strings
     */
    otp: string[];
    /**
     * Number of input fields
     * @default 1
     */
    length: number;
    /**
     * Executes automatically after all the input fields are populated
     * @param args
     * @returns
     */
    onComplete?: (...args: any[]) => void;
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
}

export const OtpFields = ({
    otp,
    onComplete,
    length = 1,
    onChange,
    containerAttr,
    inputAttr,
    containerClasses,
    inputClasses,
}: IProps) => {
    /**
     * Function to handle the main logic for backspace character deletion, right movement,
     * left movement and to focus onto the next input
     * @param e
     * @param index
     * @returns
     */
    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        const key = e.key;
        const ele = e.target as HTMLInputElement;
        const prevSib = ele.previousSibling as HTMLInputElement;
        const nextSib = ele.nextSibling as HTMLInputElement;
        const value = ele.value.trim();

        const arr = [...otp];

        if (key === "Backspace") {
            if (index === otp.length - 1) arr.pop();
            else if (arr[index] !== undefined) arr[index] = "";

            onChange(arr, index);

            if (prevSib !== null) prevSib.focus();
        } else if (key === "ArrowLeft") {
            if (prevSib === null) return;
            prevSib.focus();
        } else if (key === "ArrowRight") {
            if (nextSib === null) return;
            nextSib.focus();
        } else {
            if (value === "" || value === undefined || value === null) return;

            arr[index] = value;
            onChange(arr, index);

            if (nextSib === null) ele.blur();
            else nextSib.focus();
        }
    }

    /**
     * Function to select the input value everytime an input is focused
     * @param e
     */
    function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
        e.target.select();
    }

    // lifecycles
    useEffect(() => {
        if (otp.some((ele) => ele === "" || ele === undefined)) return;
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
            }}
            className={`${styles["container"]} ${
                containerClasses === undefined ? "" : containerClasses
            }`}
            {...containerAttr}
        >
            {new Array(Math.round(length)).fill("").map((e, i) => (
                <input
                    style={{
                        textAlign: "center",
                        maxWidth: "7rem",
                    }}
                    defaultValue={otp[i] ?? ""}
                    type="text"
                    key={i}
                    autoFocus={i === 0}
                    onFocus={(e) => handleOnFocus(e)}
                    onKeyUp={(e) => handleKeyUp(e, i)}
                    maxLength={1}
                    className={`${styles["fields"]} ${
                        inputClasses === undefined ? "" : inputClasses
                    }`}
                    {...inputAttr}
                />
            ))}
        </section>
    );
};
