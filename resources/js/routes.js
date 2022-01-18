import Home from "./components/Pages/basic/home";
import Tags from "./components/Pages/basic/tags";

export const routes = [
    {
        path : '/',
        component : Home,
        name : 'home'
    },
    {
        path : '/tags',
        component : Tags,
        name : 'tags'

    }


];



