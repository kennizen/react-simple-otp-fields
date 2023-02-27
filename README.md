# React simple OTP fields

> It is a minimal package that provides simple to use OTP input fields with most of the functionalities that are required. This package does not enforce any styles on the input fields.

# Usage

```tsx
import { OtpFields } from "react-simple-otp-fields";
import { useState } from "react";

function App() {
    // state
    const [otp, setOtp] = useState([]);

    // handler functions
    function handleOnChange(val) {
        setOtp(val);
    }

    function handleOnComplete() {
        console.log("Completed");
    }

    return (
        <OtpFields length={4} otp={otp} onChange={handleOnChange} onComplete={handleOnComplete} />
    );
}

export default App;
```

# Minimal styles

If some basic styling is required than the `style.css` from the package can be imported and used.

```tsx
import { OtpFields } from "react-simple-otp-fields";
import "react-simple-otp-fields/dist/style.css";
```

# Props

| Name             | Type                                                                                      | Description                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| length           | number                                                                                    | The number of input fields required, `default = 1`.                                    |
| onChange         | `(val: string[], index?: number) => void`                                                 | Executes on every keystroke. Provides the updated OTP and an optional index number.    |
| otp              | `string[]`                                                                                | The state variable passed onto the component props that wil reflect the latest change. |
| onComplete       | `() => void \| undefined`                                                                 | Executes when passed, after all the input fields are filled.                           |
| containerClasses | `string \| undefined`                                                                     | css classnames applied to the enclosing container of the input fields.                 |
| inputClasses     | `string \| undefined`                                                                     | css classnames applied to each of the input fields.                                    |
| containerAttr    | `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,  HTMLDivElement> \| undefined`         | gives access to all the attributes for the enclosing container of the input fields.    |
| inputAttr        | `DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> \| undefined` | gives access to all the attributes of a input field                                    |
