import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useEffect } from "react";
import "./otp.css";

interface IProps {
    otp: string[];
    cb?: (...args: any[]) => void;
    count: number;
    onChange?: (val: string[], index?: number) => void;
    containerAttr?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    inputAttr?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

const OtpFields = ({ otp, cb, count, onChange, containerAttr, inputAttr }: IProps) => {
    // functions
    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        const key = e.key;
        const ele = e.target as HTMLInputElement;
        const prevSib = ele.previousSibling as HTMLInputElement;
        const nextSib = ele.nextSibling as HTMLInputElement;

        const arr = [...otp];

        if (key === "Backspace") {
            if (index === otp.length - 1) arr.pop();
            else if (arr[index] !== undefined) arr[index] = "";

            onChange?.(arr, index);

            if (prevSib !== null) prevSib.focus();
        } else if (key === "ArrowLeft") {
            if (prevSib === null) return;
            prevSib.focus();
        } else if (key === "ArrowRight") {
            if (nextSib === null) return;
            nextSib.focus();
        } else {
            arr[index] = ele.value;
            onChange?.(arr, index);

            if (nextSib === null) ele.blur();
            else nextSib.focus();
        }
    }

    function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
        e.target.select();
    }

    // lifecycles
    useEffect(() => {
        if (otp.some((ele) => ele === "" || ele === undefined)) return;
        cb?.();
    }, [otp]);

    return (
        <section className="container" {...containerAttr}>
            {new Array(Math.round(count)).fill("").map((e, i) => (
                <input
                    style={{
                        textAlign: "center",
                    }}
                    defaultValue={otp[i] ?? ""}
                    type="text"
                    key={i}
                    autoFocus={i === 0}
                    onFocus={(e) => handleOnFocus(e)}
                    onKeyUp={(e) => handleKeyUp(e, i)}
                    maxLength={1}
                    className="fields"
                    {...inputAttr}
                />
            ))}
        </section>
    );
};

export default OtpFields;
