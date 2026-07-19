export function PageContainer({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-[800px]">
      <h1 className="mb-6 font-bold text-3xl">{title}</h1>
      {children}
    </div>
  )
}
