import { Agentation } from 'agentation'
import { Showcase } from './components/Showcase'

function App() {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-[1280px] bg-white px-10 pt-32 pb-32 text-black">
        <h1 className="text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
          A home for your design system
        </h1>

        <div className="mt-10 max-w-[640px] text-[22px] leading-[1.4]">
          <p>
            Library helps designers and engineers document
            and publish their design systems.
          </p>
          <p className="mt-6">
            Made for people. Ready for AI. Built for the future.
          </p>
        </div>

        <Showcase />
      </main>
      {import.meta.env.DEV && <Agentation />}
    </>
  )
}

export default App
