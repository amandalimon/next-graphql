import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import { Card } from 'semantic-ui-react'

const query = `
  query{
    avos{
      id
      image
      name
      createdAt
      sku
      price
      attributes {
        description
        taste
        shape
        hardiness
      }
    }
  }
`

const baseURL = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:3000/'

const requester = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// const requester = (endpoint?: string, data?: Record<string, number | string>) =>
//   fetch(`${baseURL}${endpoint}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })

const useAvocados = () => {
  return useQuery('avodcados', async () => {
    const response = await requester.post<{ data: TProduct[] }>('/graphql', { query })
    return response.data.data
  })


  // const [data, setData] = useState<TProduct[]>([])
  // const [status, setStatus] = useState<
  //   'success' | 'loading' | 'error' | 'idle'
  // >('idle')

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setStatus('loading')
  //     try {
  //       const response = await requester('/graphql', { query })

  //       const { data } = (await response.json()) as { data: TProduct[] }
  //       setData(data)
  //       setStatus('success')
  //     } catch (e) {
  //       setStatus('error')
  //       console.log('Something went wrong', e)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // return {
  //   data,
  //   status,
  // }
}

const HomePage = () => {

  const { data, status } = useAvocados()

  console.log({ data, status })

  return (
    <Layout title="Home">
      <KawaiiHeader />
      <Card.Group itemsPerRow={2} centered>
        {documentationList.map((doc) => (
          <Card
            key={doc.link}
            href={doc.link}
            header={doc.title}
            meta={doc.meta}
            description={doc.description}
          />
        ))}
      </Card.Group>
    </Layout>
  )
}

const documentationList = [
  {
    title: 'Documentación Proyecto',
    meta: 'Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-graphql-fullstack',
  },
  {
    title: 'Documentación Next.js',
    meta: 'Documentación',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación GraphQL',
    meta: 'Documentación',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://graphql.org/learn/',
  },
  {
    title: 'Curso de GraphQL con Node.js',
    meta: 'Proyecto',
    description:
      'Revisa el curso en donde creamos todo el backend y la API para este proyecto.',
    link: 'https://platzi.com/cursos/graphql-nodejs/',
  },
]

export default HomePage
