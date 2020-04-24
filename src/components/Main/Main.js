import React from 'react'
import './Main.css'
import UserContext from '../../Contexts/UserContext'
import SwipeService from '../../services/swipe-service'
import { Link } from 'react-router-dom'
import userSVG from '../../images/user.svg'
import contactsSVG from '../../images/contacts.svg'
import nintendoNetworkLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/Playstation_logo_colour.svg'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/Xbox_one_logo.svg'
import checkmarkSVG from '../../images/checkmark-circle-2.svg'
import x_markSVG from '../../images/x-circle.svg'
import down_caretSVG from '../../images/solid_caret-down.svg'


export default class MainPage extends React.Component {
    state = {
        potentialMatches: [],
        expanded: false,
        error: null
    }

    static contextType = UserContext;

    componentDidMount() {
        SwipeService.getPotentialMatches(this.context.user.id)
            .then(potentialMatches => {
                console.log(potentialMatches);
                this.setState({ potentialMatches: potentialMatches.queue })
            })
            .catch(error => this.setState({error}));
    }

    toggleExpanded = () => {
        this.setState({ expanded: true })
    }
    
    removeExpanded = () => {
        this.setState({ expanded: false })
    }

    componentWillUnmount() {
        this.setState({ expanded: false })
    }

    generateLfmElements = (games) => {
        return games.map(game => {
            return (<span className='main__lfm-in'>{game}</span>)
        })
    }

    generateGenreString = (genres) => {
        try {
            let genreString = '';
            if (genres.length === 0) {
                genreString = 'No Genres Chosen'
            } else if (genres.length === 1) {
                genreString = genres[0]
            } else {
                for (let i = 0; i < genres.length; i++) {
                    if (i < genres.length - 1) {
                        genreString += `${genres[i]}, `
                    } else if (i === genres.length - 1) {
                        genreString += `${genres[i]}`
                    }
                }
            }
            return genreString
            }
        catch {
            return ''
        }
    }

    render() {
        const userOne = this.state.potentialMatches[0] || {}

        if(!userOne.id) {
            return (
                <section className='main__Swipe'>
                    <div className='main__Nav'>
                    <Link to='/profile'>
                        <img className='main__profile-button' src={userSVG} alt='profile' />
                    </Link>
                    <Link to='/matches'>
                        <img className='main__contacts-button' src={contactsSVG} alt='contacts' />
                    </Link>
                    </div>
                    <li className='main__Swipe-User'>
                        <div className='loading'>Loading</div>
                    </li>
                </section>
            )
        }
        
        return (
            <section className='main__Swipe'>
                <div className='main__Nav'>
                    <Link to='/profile'>
                        <img className='main__profile-button' src={userSVG} alt='profile' />
                    </Link>
                    <Link to='/matches'>
                        <img className='main__contacts-button' src={contactsSVG} alt='contacts' />
                    </Link>
                </div>
                <li className='main__Swipe-User'>
                    {this.state.expanded ? (<></>) : (<img src={userOne.avatar} alt='avatar' className='main__Image' />)}
                    {this.state.expanded ? (<></>) : (<h3 className='main__display-name'>{userOne.display_name}</h3>)}
                    <h4 className={this.state.expanded ? 'main__card-header rounded' : 'main__card-header'}>Platforms</h4>
                    <div className='main__platforms'>
                        {userOne.platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {userOne.platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {userOne.platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' /> : null}
                        {userOne.platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <h4 className='main__card-header'>LFM In</h4>
                    {/*{this.generateLfmElements(userOne.lfm_in)}*/}
                    <p>{userOne.lfm_in}</p>
                    <h4 className='main__card-header'>Genres</h4>
                    <span>{this.generateGenreString(userOne.genres)}</span>
                    {this.state.expanded ? (<><h4 className='main__card-header'>Bio</h4>
                    <p className='main__bio'>{userOne.bio}</p></>)
                    :
                    (<></>)}
                    {/* <img className='main__down-caret' src={down_caretSVG} alt='down-caret' /> */}
                    <div className='main__caret-container'>
                        {this.state.expanded ? (<input className='main__down-caret-reverse' type="image" src={down_caretSVG} 
                        alt='down-caret' onClick={this.removeExpanded} />)
                        :
                        (<input className='main__down-caret' type="image" src={down_caretSVG} 
                        alt='down-caret' onClick={this.toggleExpanded} />)}
                    </div>
                </li>
                <div className='main__Second-Nav'>
                    <img className='main__x' src={x_markSVG} alt='x' />
                    <img className='main__check' src={checkmarkSVG} alt='checkmark'/>
                </div>
            </section>
        )
    }
}