import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";

type Props = {
  pokemon: PokemonTCG.Card & { isCollected?: boolean };
};

const Pokemon = (props: Props) => {
  const { pokemon } = props;
  return (
    <img
      alt={pokemon.name}
      src={pokemon.images.small}
      style={{ opacity: pokemon?.isCollected ? 1 : 0.4 }}
      className="w-[100px]"
    />
  );
};

export default Pokemon;
