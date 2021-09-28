import { heroes } from "../data/heroes";

 
export const getHeroeId = (id) => {
    return heroes.find(hero => hero.id === id );

}