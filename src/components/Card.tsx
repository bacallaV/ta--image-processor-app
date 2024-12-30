export default function Card(
  image: {
    id: number,
    title: string,
    url: string,
  }
) {
  return (
    <div className="card sm:max-w-sm">
      <figure>
        <img src={'http://localhost:3001/'+image.url} alt="Watch" className="size-64" />
      </figure>
      <div className="card-body">
        <div className="flex flex-row justify-between items-center gap-4 my-4">
          <h5 className="card-title"> {image.title} </h5>
        </div>
      </div>
    </div>
  )
}