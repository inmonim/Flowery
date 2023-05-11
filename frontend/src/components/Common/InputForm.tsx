import React from "react";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export default function InputForm(props: InputFormProps) {
  const { label, placeholder } = props;
  return (
    <>
      <div className={styles.containers}>
        <div className={styles.description}>
          <label htmlFor="id">{label}</label>
        </div>
        <input
          className={styles.inputform}
          id="id"
          type={props.type}
          placeholder={placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </>
  );
}
