import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";


// the most simple test you can create
test('simple', () => {
    expect(1 + 1).toBe(2)
})

// start using render since we configured swc
test('using render', () => {
    const { getByText } = render(<App />)

    expect(getByText('Hello World')).toBeTruthy()
})

// other types of assertions (see readme for usage)
test('other assertions', () => {
    const { getByText } = render(<App />)

    expect(getByText('Hello World')).toBeInTheDocument()
    expect(getByText('Hello World')).toHaveAttribute('class', 'test')
})

// other options of get, find, query delivered by render()
test('get, find and query', async () => {
    const { findByText, queryByText, getByTestId } = render(<App />)
    // remember that 'find' is async so we need to transform the test function to async
    expect(await findByText('Hello World')).toBeInTheDocument()
    // query don't return errors if the element does not exist, and .not. makes the negative
    expect(queryByText('Hello Itanu')).not.toBeInTheDocument()
    // using testid
    expect(getByTestId('hello')).toBeInTheDocument()
})

// Now the big guns - doing like a pro

describe('App', () => {
    it('Should render list items', () => {
        const { getByText } = render(<App />)

        expect(getByText('itanu')).toBeInTheDocument()
        expect(getByText('fulano')).toBeInTheDocument()
        expect(getByText('ciclano')).toBeInTheDocument()
    })
    // using user-event to click the button
    it('Should add item to the list of items', async () => {
        const { getByText, getByPlaceholderText, findByText } = render(<App />)
        const addButton = getByText('Adicionar')
        const inputElement = getByPlaceholderText('Novo item')

        await userEvent.type(inputElement, 'beltrano')

        await userEvent.click(addButton)

        expect(await findByText('beltrano')).toBeInTheDocument()
    })

    // using debug
    it('Should add item to the list of items', async () => {
        const { getByText, debug, getByPlaceholderText, findByText } = render(<App />)
        const addButton = getByText('Adicionar')
        const inputElement = getByPlaceholderText('Novo item')
        debug()
        await userEvent.type(inputElement, 'beltrano')
        await userEvent.click(addButton)
        debug()
        expect(await findByText('beltrano')).toBeInTheDocument()
    })

    // using waitFor
    it('Should add item to the list of items', async () => {
        const { getByText, getByPlaceholderText} = render(<App />)
        const addButton = getByText('Adicionar')
        const inputElement = getByPlaceholderText('Novo item')
        
        await userEvent.type(inputElement, 'beltrano')
        await userEvent.click(addButton)
        
        await waitFor(async() => {
            expect(getByText('beltrano')).toBeInTheDocument()
        })
    })
    // using wait for element to be removed
    it('Should be able to remove item from the list', async () => {
        const { getAllByText, getByText } = render(<App />)

        const removeButtons = getAllByText('Excluir')

        await userEvent.click(removeButtons[0])

        await waitForElementToBeRemoved(() => {
            return getByText('itanu')
        })
    })
})