export default function Social() {
  return (
    <section className="flex-col items-center px-3 md:px-0 mb-10 md:mb-20">
      
      <h2 className="text-yellow-500 font-bold text-2xl md:text-3xl mb-5">Redes <i className="fa-solid fa-at"></i></h2>
      
      <div className="flex items-center gap-2 md:gap-5 mt-5 text-lg md:text-xl flex-wrap">
        
        <a className="text-sky-600 hover:scale-[1.02] font-bold py-3 px-5 border-2 border-neutral-300 rounded-lg hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500"
         href="https://www.linkedin.com/in/javxdev/" target="_blank">
          <i className="fa-brands fa-linkedin "></i>
          <span className="ml-1 text-lg md:text-xl">Linkedin</span>
        </a>

        <a className="text-neutral-950 dark:text-neutral-300 hover:scale-[1.02] font-bold py-3 px-5 border-2 border-neutral-300 rounded-lg hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500"
         href="https://github.com/javxdev" target="_blank">
          <i className="fa-brands fa-github"></i>
          <span className="ml-1 text-lg md:text-xl">Github</span>
        </a>

        <a className="text-[#8522b2] hover:scale-[1.02] font-bold py-3 px-5 border-2 border-neutral-300 hover:border-neutral-400 rounded-lg dark:border-neutral-600 dark:hover:border-neutral-500"
         href="https://www.tiktok.com/@javxdev" target="_blank">
          <i className="fa-brands fa-tiktok"></i>
          <span className="ml-1 text-lg md:text-xl">TikTok</span>
        </a>

      </div>

    </section>
  )
}
