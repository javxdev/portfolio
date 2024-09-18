export default function Footer() {
  return (
    <footer className="text-yellow-500 pb-10 px-3 md:px-0 md:pb-32">
      <h3 className="text-2xl md:text-3xl  font-bold">Email <i className="fa-solid fa-envelope mb-5"></i></h3>
      <div className="flex gap-2">
        <input className="text-neutral-800 bg-neutral-300 text-lg md:text-2xl w-full py-1 ps-4 rounded-md font-semibold" value="javxdev@gmail.com" type="text" name="" id="userOutput" disabled/>
        <div className="flex gap-2">
          <a href="mailto:javierbk9@gmail.com" target="_blank">
            <i className="fa-solid fa-paper-plane cursor-pointer text-xl md:text-2xl py-1 px-3 md:px-4 border-2 rounded-md border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500"></i>
          </a>
        </div>
      </div>
  </footer>
  )
}
