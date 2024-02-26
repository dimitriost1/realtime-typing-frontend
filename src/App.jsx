import { useState } from "react"

function App() {

  const [text, setText] = useState("")

  return (
    <>
      <div className="lg:columns-2 my-4">
        <div className="mockup-window border bg-base-300">
          <textarea className="textarea textarea-primary textarea-lg h-80" placeholder="Type here..." onChange={(e) => setText(e.target.value)} value={text} />
        </div>
        <div className="mockup-window border bg-base-300 ">
          <textarea className="textarea textarea-primary textarea-lg h-80" disabled value={text} />
        </div>
      </div>
    </>
  )
}

export default App
