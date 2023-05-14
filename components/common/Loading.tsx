const ARRAY_LENGTH = 3
const DELAY_VALUE = 0.15

export function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[1000] flex h-screen w-full items-center justify-center bg-black">
      <div className="relative h-[80px] w-[80px]">
        {Array.from(Array(ARRAY_LENGTH).keys()).map(value => (
          <div
            key={value}
            className="absolute m-2 block h-[64px] w-[64px] animate-loading rounded-[50%] border-8 border-solid border-white border-x-transparent border-b-transparent"
            style={{ animationDelay: `-${((value + 1) * DELAY_VALUE).toFixed(2)}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}
