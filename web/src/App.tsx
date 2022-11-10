import { GameController, MagnifyingGlassPlus } from 'phosphor-react'
import { useEffect, useState } from 'react';
import logoSport from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/Form/CreateAdBanner';
import { GameBanner } from './components/Form/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';
import './Styles/main.css';
import { CreateAdModal } from './components/Form/CreateAdModal';
import axios from 'axios';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    return (
        <div className="max-w-[1344px] px-10 mx-auto flex flex-col items-center my-20">
            <img src={logoSport} alt="" />
            <h1 className="text-5xl text-white font-black mt-6">
                Seu <span className='text-transparent bg-duoGradient bg-clip-text'>duo </span>
                está aqui</h1>
            <div className=' grid grid-cols-6 gap-6 mt-16'>
                {
                    games.map(game => {
                        return (
                            <GameBanner
                                key={game.id}
                                bannerUrl={game.bannerUrl}
                                adsCount={game._count.ads}
                                title={game.title}
                            />)
                    })
                }
            </div>
            <Dialog.Root>
                <CreateAdBanner/>
                <CreateAdModal/>
            </Dialog.Root>
        </div>
    )
}

export default App
