import React from "react";
import * as S from "./styles";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  direction?: "column" | "row";
}

const Container = ({
  children,
  className,
  direction = "row",
}: ContainerProps) => {
  return (
    <S.Container className={className} direction={direction}>
      {children}
    </S.Container>
  );
};

export default Container;
