import { useState, useEffect } from "react"
import Card from '../Card/Card'
import style from './Main.module.css'
import initialPosts from '../posts'

const initialFormData = {
  title: "",
  image: "",
  content: "",
  tags: [],
  published: true,
}

export default function Main() {

  const [posts, setPosts] = useState(initialPosts)
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    console.log(`Pubblico?: ${formData.published}`)
  }, [formData.published])



  function handleFormData(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const newFormData = {
      ...formData,
      [e.target.name]: value,
    }
    setFormData(newFormData)
  }


  function addBlog(e) {
    e.preventDefault()
    if (formData.title === '') return

    const newBlog = {
      id: Date.now(),
      ...formData,
      tags: formData.tags.split(',').map(el => el.trim())

    }

    setPosts([...posts, newBlog])
    setFormData(initialFormData)
    console.log("aggiungo un nuovo post")
  }


  function deleteBlog(blogtext) {
    setPosts(posts.filter(post => post !== blogtext))
  }

  return (
    <main>
      <section className={style.section}>
        <form onSubmit={addBlog} action="">
          <input type="text" name="title" value={formData.title} onChange={handleFormData} placeholder="Inserisci il titolo" />
          <input type="text" name="image" value={formData.image} onChange={handleFormData} placeholder="Inserisci l'url dell'immagine" />
          <input type="text" name="tags" value={formData.tags} onChange={handleFormData} placeholder="Inserisci i tag" />
          <input type="text" name="content" value={formData.content} onChange={handleFormData} placeholder="Inserisci del contenuto" />
          <div className={style.published}>
            <label htmlFor="published"> Vuoi visuallizare?</label>
            <input id="published" type="checkbox" name="published" checked={formData.published} onChange={handleFormData} />
          </div>

          <button type="submit"> Aggiungi</button>
        </form>
        <div className={style.listItem}>
          <ul>
            {posts.filter(post => post.published === true).map(post => (

              <li key={post.id}> {post.title}
                <button onClick={() => deleteBlog(post)}>Elimina</button>
              </li>
            ))}
          </ul>
        </div>
      </section>


      <section>
        <div className="container">
          {
            posts.length ?
              <div className="row">
                {posts.map((post) => (
                  <div key={post.id} className="col-6" >
                    <Card
                      title={post.title}
                      tags={post.tags}
                      image={post.image}
                      content={post.content}
                      published={post.published}
                    />
                  </div>
                ))}
              </div> :
              <p>Non ci sono post</p>
          }
        </div>
      </section>


    </main>

  )
}