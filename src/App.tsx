import { Agentation } from 'agentation'
import { Showcase } from './components/Showcase'

function App() {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-[1280px] bg-white px-10 pt-32 pb-32 text-black">
        <Showcase />
      </main>
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App
