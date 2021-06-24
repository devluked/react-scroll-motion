import React, { useContext, useState } from "react";
import { IAnimation, IStyle } from "./utils/interface";
import { ScrollContainerContext, ScrollPageContext } from "./ScrollContext";

interface IProp {
  children: React.ReactNode
  animation: IAnimation
}

const Animator = ({ children, animation = {} } : IProp) => {
  const { currentPage, currentProgress } = useContext(ScrollContainerContext);

  const { page } = useContext(ScrollPageContext);

  const filterStyle = (style: object = {}, ...params: any[]) => {
    const filteredStyle: IStyle = { ...style };
    for (const key in filteredStyle)
      if (typeof filteredStyle[key] === "function")
        filteredStyle[key] = (filteredStyle[key] as Function)(...params);
    return filteredStyle;
  };

  const calculatedStyle =
    currentPage === page // for current (out)
      ? { ...filterStyle(animation?.out?.style, currentProgress) }
      : currentPage === page - 1 // for next (in)
      ? { ...filterStyle(animation?.in?.style, currentProgress) }
      : { display: "initial"};

  return <div style={calculatedStyle}>{children}</div>;
};

export default Animator;
