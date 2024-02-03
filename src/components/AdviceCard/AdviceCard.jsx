import styles from "./AdviceCard.module.css";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const AdviceCard = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["adviceData"],
    queryFn: async () => {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      return data;
    },
  });

  const handleClick = () => {
    refetch();
  };

  return (
    <article className={styles.cardWrapper}>
      <span>Advice #{isPending || error ? "---" : data.slip.id}</span>
      <h1>
        <q>{isPending || error ? "loading" : data.slip.advice}</q>
      </h1>
      <button onClick={handleClick}>
        <img className={styles.diceImg} src="./icon-dice.svg" alt="" />
      </button>
      <picture className={styles.horizontalRule}>
        <source
          media="(max-width:600px)"
          srcSet="./pattern-divider-mobile.svg"
        />
        <source
          media="(min-width:601px)"
          srcSet="./pattern-divider-desktop.svg"
        />
        <img src="./pattern-divider-desktop.svg" alt="" />
      </picture>
    </article>
  );
};
