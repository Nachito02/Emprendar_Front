import Paginated from "../../components/Paginated";
import { useDispatch, useSelector } from "react-redux"
import { changePathToFilterAndSearch, deleteSearchAndFilter, filterAllProjectos, filterCategory, filterCountry, getHomeProjects, orderTop } from "../../redux/actions";
import Layout from "../../components/Layout";
import style from "./styles/home.module.css"
import { useEffect, useState } from "react";
import { authedUser } from "../../redux/actions";
import { useRouter } from "next/router";
import Link from "next/link";
import Slider from "components/slider";

//imports de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { faUsers, faDollarSign, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPhone, faAddressCard, faList, faFlag } from "@fortawesome/free-solid-svg-icons";



export default function Home() {

    const dispatch = useDispatch()

    const { allProjectsCopy, searchProjects, category, country } = useSelector(state => state)

    useEffect(() => {
        dispatch(getHomeProjects())
    }, [])

    const [ordenss, setOrden] = useState('')
    const [countriess, setCountry] = useState('')
    const [categoriess, setCategory] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        let path
        ordenss !== ''
            ? path = `orden=${ordenss}&`
            : path = `orden=&`
        countriess !== ''
            ? path = path + `country=${countriess}&`
            : path = path + `country=&`
        categoriess !== ''
            ? path = path + `category=${categoriess}&`
            : path = path + `category=&`
        search !== ''
            ? path = path + `search=${search}`
            : path = path + `search=`
        dispatch(changePathToFilterAndSearch(path))

    }, [ordenss, countriess, categoriess, search])

    /* let toPath = [ordenss, countriess, categoriess] */

    const handlerDeleteSearch = () => {
        setOrden(''),
        setCountry(''),
        setCategory(''),
        setSearch('')
    }

    return (
        <Layout>
            <div className={style.allContainer}>
                <div className={style.bodyContainer}>
                <Slider />
                <div className={style.subMenuContainer}>
                    <ul>
                        <li><Link href="/users"><FontAwesomeIcon icon={faUsers} className={style.theIcon} /> Usuarios</Link></li>
                        <li><Link href="#"><FontAwesomeIcon icon={faPhone} className={style.theIcon} />Contáctanos</Link></li>
                        <li><Link href="/aboutUs"><FontAwesomeIcon icon={faAddressCard} className={style.theIcon} />Acerca de</Link></li>
                        <li className={style.dropdown}><Link href="#menu"><FontAwesomeIcon icon={faArrowDownWideShort} className={style.theIcon} />Ordenar Por</Link>
                                <div id="menu" className={style.dropdownContent}>
                                    <section className={style.column}>
                                        <div>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faDollarSign} className={style.theIcon} />Donación</div>
                                                <div className={style.accordion__content} value={ordenss}>
                                                        <button onClick={(e) => setOrden(e.target.value)} value=''> - </button>
                                                        <button onClick={(e) => setOrden(e.target.value)} value='ASC'>Ascendente</button>
                                                        <button onClick={(e) => setOrden(e.target.value)} value='DESC'>Descendente</button>
                                                </div>
                                            </label>
                                            <label className={style.accordion} >
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faFlag} className={style.theIcon} />País</div>
                                                <div className={style.accordion__content} value={countriess}>
                                                    <button onClick={(e) => setCountry(e.target.value)} value=''> - </button>
                                                    {
                                                        country?.map((c, index) => {
                                                            return (<button value={`${c}`} key={index} onClick={(e) => setCountry(e.target.value)}>{c}</button>)
                                                        })
                                                    }
                                                </div>
                                            </label>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faList} className={style.theIcon} />Categoria</div>
                                                <div className={style.accordion__content}>
                                                <button onClick={(e) => setCountry(e.target.value)} value=''> - </button>
                                                    {
                                                        category?.map((c, index) => {
                                                            return (<button value={`${c}`} key={index} onClick={(e) => setCategory(e.target.value)}>{c}</button>)
                                                        })
                                                    }
                                                </div>
                                            </label>
                                            <label className={style.accordion}>
                                                <div className={style.accordion__header}>
                                                    <button type="button" onClick={() => handlerDeleteSearch()}>
                                                        <FontAwesomeIcon icon={faDeleteLeft} className={style.theIconInvert} />
                                                        Borrar filtro
                                                    </button>   
                                                </div>
                                            </label>
                                            
                                        </div>
                                    </section>
                                </div>
                        </li>
                        <div className={style.menuSearch}>
                            <input value={search} type='search' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar proyecto..." ></input>
                        </div>
                    </ul>
                </div>
                    {/* <form>
                        <div className={style.filtersContainer}>
                            <div>
                                <label>Highest Donations </label>
                                <select value={ordenss} className={style.select} onChange={(e) => setOrden(e.target.value)}>
                                    <option value=''> - </option>
                                    <option value="ASC">Ascendente</option>
                                    <option value="DESC">Descendente</option>
                                </select>
                            </div>
                            <div>
                                <label>Country </label>
                                <select value={countriess} className={style.select} onChange={(e) => setCountry(e.target.value)}>
                                    <option value=''> - </option>
                                    {
                                        country?.map((c, index) => {
                                            return <option value={c} key={index}>{c}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Category </label>
                                <select value={categoriess} className={style.select} onChange={(e) => setCategory(e.target.value)}>
                                    <option value=''> - </option>
                                    {
                                        category?.map((c, index) => {
                                            return <option value={c} key={index}>{c}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <input value={search} type='search' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." ></input>
                            </div>
                            <div>
                                <button type="button" onClick={() => handlerDeleteSearch()}>Limpiar</button>
                            </div>
                        </div>
                    </form> */}
                    <Paginated />
                </div>
            </div>
        </Layout>
    )

}






