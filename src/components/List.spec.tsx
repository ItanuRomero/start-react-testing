import { render, screen } from "@testing-library/react"
import List from "./List"


describe('List', () => {
    it('Should render different lists', async () => {
        const { getByTestId } = render(<List initialItems={['itanu', 'fulano']}/>)
        
        expect(getByTestId('list')).toHaveTextContent('itanu')
    })

    it('Should render different lists', async () => {
        const { getByTestId } = render(<List initialItems={['fulano']}/>)
    
        expect(getByTestId('list')).not.toHaveTextContent('itanu')
    })
})
