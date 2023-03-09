import CardProject from "./CardProject";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentPageHandler, getHomeProjects } from "../redux/actions";
import style from "./styles/Paginated.module.css"

export default function Paginated() {
    const currentPage = useSelector(state => state.currentPage)
    const allProjects = useSelector(state => state.allProjects)
    const dispatch = useDispatch()
    const page = []

    useEffect(() => {
        async function fetchData() {
            if (!allProjects.length) {
                await dispatch(getHomeProjects())
                // console.log("get ",allProjects)
                // console.log("carga de get ")
                /* setTimeout(()=>{dispatch(Loading())}, 0 )*/
            }

        }
        fetchData()
    }, [currentPage])

    for (let i = 0; i < allProjects.length; i = i + 6) {
        page.push(allProjects.slice(i, i + 6 || allProjects.length))
    }

    const handlePage = (event) => {
        dispatch(currentPageHandler(parseInt(event.target.value)))
    }

    const handlePrevClick = () => {
        currentPage > 0 && dispatch(currentPageHandler(currentPage - 1))
    };

    const handleNextClick = () => {
        currentPage < page.length - 1 && dispatch(currentPageHandler(currentPage + 1))
    }

    return (
        <div className={style.container}>
            <div className={style.paginatedContainer}>

                <button onClick={handlePrevClick}>&laquo; Anterior</button>
                {
                    page?.map((p, index) => <button onClick={handlePage}
                        value={index}
                        key={index}>{index + 1}</button>)

                }
                <button onClick={handleNextClick}>Siguiente &raquo;</button>
            </div>

            <div className={style.cards}>
                {page[currentPage]?.map(project => {
                    return (
                        <CardProject
                            key={project.id}
                            idProject={project.id}
                            name={project.title}
                            summary={project.summary}
                            date={project.date}
                            goal={project.goal}
                            img={project.img}
                            userId={project.userId}
                            user_name={project.user?.user_name}
                            profile_img={project.user?.profile_img}
                            categories={project.categories}
                            country={project.country.name}
                        />


                    )
                })}
                {/* <hr /> */}
            </div>
        </div>
    )
}