import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return(<div className='pt-1 bg-duoGradient self-stretch rounded-lg mt-8 overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6  flex justify-between items-center'>
            <div>
                <strong className='text-2xl text-white font-black block'>Não encontrou seu duo ?</strong>
                <span className='text-zinc-400'>Publique um anúncio</span>
            </div>
            <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex justify-between items-center'>
                <MagnifyingGlassPlus />
                Publicar anúncio
            </Dialog.Trigger>
        </div>
    </div>
    )
}