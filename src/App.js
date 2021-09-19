import React, {useState, useEffect} from 'react'
import wordList from './resources/words.json'


const MAX_TYPED_KEYS = 30

const getWord = () => {
    const index = Math.floor(Math.random() * wordList.length)
    const word = wordList[index]
    return word.toLowerCase()
}

const isValidKey = (key, word) => {
    if(!word) return false
    const result = word.split('').includes(key)
    return result
}

const Word = ({word, validKeys}) => {
    if(!word) return null
    const joinedKeys = validKeys.join('')
    const matched = word.slice(0, joinedKeys.length)
    
    const remainder = word.slice(joinedKeys.length)


    return(
    <>
        <span className="matched">{matched}</span>
        <span className="remainder">{remainder}</span>
    </>
    )
}
const App = () => {
      
    const [typedKeys, setTypedKeys] = useState([])    //needed to import it useState
    const [validKeys, setValidKeys] = useState([])    //needed to import it useState

    const [word, setWord] = useState('')

    useEffect(() => {
        setWord(getWord())
    }, [])

    const handleKeyDown = (e) => {
        e.preventDefault()
        const { key } = e  //destructuring event, key is a property

        setTypedKeys((prev) => [...prev, key].slice(MAX_TYPED_KEYS * -1)) // retorna o spread do typedKeys e a key atual; slice das ultimas 30 letras
        
        if(isValidKey(key, word)){
            setValidKeys((prev) =>{
                const isValidLength = prev.length <= word.length
                const isNextCharacter = isValidLength && word[prev.length] === key

                return (isNextCharacter) ? [...prev, key] : prev
            })

        }    
    }

    return (
        <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
            <div className="valid-keys">
                <Word word={word} validKeys={validKeys} />
            </div>
            <p className="typed-keys">{typedKeys ? typedKeys.join('') : null}</p>
            <div className="completed-words">
                <ol>
                    <li>livro</li>
                    <li>caderno</li>
                    <li>aperfeiçoamento</li>
                </ol>
            </div>
        </div>
    )
}

export default App