import BarberclockItem from "../_components/barberclock-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarberclockPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

const BarberclockPage = async ({ searchParams }: BarberclockPageProps) => {
  const { search } = await searchParams
  const barberclock = await db.barberclock.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search || "",
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: search || "",
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barberclock.map((barberclock) => (
            <BarberclockItem key={barberclock.id} barberclock={barberclock} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarberclockPage
