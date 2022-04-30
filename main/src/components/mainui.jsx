import { BiDotsHorizontalRounded, BiPaperPlane } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { RiChat3Line } from 'react-icons/ri';
import { GoPrimitiveDot } from 'react-icons/go';
import { CgPentagonDown } from 'react-icons/cg';
import DummyWork from './dummywork';
import {getFeed} from "../firebase/image"
import {useEffect} from 'react'
import {connect} from "react-redux";
import { updateFeeds } from '../redux/action';

function MainUi(props){
    const {feeds, dispatch} = props;

    useEffect(() => {
        getFeed().then((feeds) => dispatch(updateFeeds(feeds.data)));
    }, []);

    return (
        <section className="container margin-tb" >
            <div className="main-ui" >
            <ul className="ui" >
                {
                    feeds.map((feed,index) => {
                        return (
                <li className="li" >
                    <header className="header-li flex-between-center" >
                        <div className='info flex-center-center' >
                            <div className='flex-center-center' >
                                <img src={feed} alt="" />
                            </div>
                            <p className='flex-column-center-center' >
                                <span>thetrillionairelife</span>
                                <span className='city' >London, United Kingdom</span>
                            </p>
                        </div>
                        <div className='flex-center-center' ><BiDotsHorizontalRounded className='BiDotsHorizontalRounded' /></div>
                    </header>
                    <div className='image' >
                        <img src={feed} alt="" />
                    </div>
                    <div className='all-icons flex-between-center' >
                        <div className='flex-between-center' >
                            <FiHeart className='three-icons' />
                            <RiChat3Line className='three-icons rotate-45' />
                            <BiPaperPlane className='three-icons' />
                        </div>
                        <div className='two-dot-icon' >
                            <GoPrimitiveDot className='bsdot-1' />
                            <GoPrimitiveDot  className='bsdot-2'  />
                        </div>
                        <div  className='' >
                            <CgPentagonDown className='save-icon' />
                        </div>
                    </div>
                    <div className='likes' >
                        20,047 likes
                    </div>
                    <div className='name-description' >
                        <span  className='first' >theTrillionaireLife</span>
                        <span className='second' >The only way to travel 🛩 #TheTrillionaireLife</span>
                    </div>
                </li>
                            
                        )
                    })
                }
            </ul>
            <section className='dummy-work' >
            <DummyWork />
            </section>
            </div>
        </section>
    )
}

const mapsStateToProps = (state) => ({...state})

export default connect(mapsStateToProps)(MainUi);