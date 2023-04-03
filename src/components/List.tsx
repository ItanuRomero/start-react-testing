import { useState } from 'react'

type ListProps = {
    initialItems: string[]
}

function List({initialItems}: ListProps) {
  const [ newItem, setNewItem ] = useState('')
  const [ list, setList ] = useState(initialItems)

  function addToList() {
    // backend simulation
    setTimeout(() => {
      setList(state => [...state, newItem])
    }, 500)
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== item))
    }, 500);
  }
  return (
    <>
      {/* to use on the simple tests */}
      <h1 data-testid='hello' className='test'>Hello World</h1>

      <input placeholder='Novo item' type="text" onChange={e => {
        setNewItem(e.target.value)
      }}/>
      <button onClick={addToList}>Adicionar</button>
      <ul data-testid='list'>
        {list.map(item => (
          <li key={item} >
            {item}
            <button onClick={() => {
              removeFromList(item)
            }}>Excluir</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
