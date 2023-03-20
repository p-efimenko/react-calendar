import React from "react";

interface Props {
  children: React.ReactNode;
  id?: string;
  onSubmit(event: React.FormEvent): void;
  submitOnEnter?: boolean;
}

export const Form = (props: Props) => {
  //
  const { id, children, submitOnEnter = false, onSubmit } = props;

  const onKeyDown = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    //
    if (submitOnEnter) return;

    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <>
      <form id={id} onSubmit={onSubmit} onKeyDown={onKeyDown}>
        {children}
      </form>
    </>
  );
};
