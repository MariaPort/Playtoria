import {redirect} from 'next/navigation'

export default function Home() {
    redirect('/liveView');
  
    return (
        <main>
            <h2>Playtoria</h2>
        </main>
    )
}
