import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import KaugummiPage from '../KaugummiPage.jsx';
import { AuthProvider } from '../../context/AuthContext.jsx';
import API from '../../api.js';

jest.mock('../../api.js');

describe('KaugummiPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1. Lädt und rendert Airwaves Menthol (ID 1)', async () => {
        const mockDbData = [
            {
                id: 1,
                name: 'Airwaves',
                marke: 'Wrigley',
                geschmack: 'Menthol',
                inhaltsstoffe: 'Sorbit, Kaumasse, Aromen',
                nebenwirkungen: 'Kann bei übermäßigem Verzehr abführend wirken',
                bildUrl: '/Last.png',
                zuckerfrei: true
            }
        ];

        API.get.mockResolvedValue({ data: mockDbData });

        render(
            <AuthProvider>
                <BrowserRouter>
                    <KaugummiPage />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(await screen.findByText('Airwaves')).toBeInTheDocument();
        expect(screen.getByText(/Menthol/i)).toBeInTheDocument();
        expect(screen.getByText(/Wrigley/i)).toBeInTheDocument();
    });

    test('2. Lädt und rendert True Gum Pineapple (ID 4)', async () => {
        const mockDbData = [
            {
                id: 4,
                name: 'True Gum Pineapple',
                marke: 'True Gum',
                geschmack: 'Pineapple',
                inhaltsstoffe: '...',
                nebenwirkungen: 'Keine bekannten Nebenwirkungen',
                bildUrl: '/Last.png',
                zuckerfrei: true
            }
        ];

        API.get.mockResolvedValue({ data: mockDbData });

        render(
            <AuthProvider>
                <BrowserRouter>
                    <KaugummiPage />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(await screen.findByRole('heading', { name: 'True Gum Pineapple' })).toBeInTheDocument();

        // 2. Prüft exakt das Wort "Pineapple" als Geschmack (oder nutze getAllByText)
        expect(screen.getByText('Pineapple', { exact: true })).toBeInTheDocument();

        // 3. Prüft die Nebenwirkungen
        expect(screen.getByText(/Keine bekannten Nebenwirkungen/i)).toBeInTheDocument();
    });

    test('3. Rendert alle Produkte aus der Datenbank-Tabelle', async () => {
        const fullDbMock = [
            {
                id: 1,
                name: 'Airwaves',
                marke: 'Wrigley',
                geschmack: 'Menthol',
                inhaltsstoffe: 'Sorbit, Kaumasse, Aromen',
                nebenwirkungen: 'Kann bei übermäßigem Verzehr abführend wirken',
                bildUrl: '/Last.png'
            },
            {
                id: 3,
                name: 'True Gum Mint',
                marke: 'True Gum',
                geschmack: 'Minze',
                inhaltsstoffe: 'Plastik Freier Kaugummi',
                nebenwirkungen: 'Kann bei übermäßigem Verzehr abführend wirken',
                bildUrl: 'https://www.brack.ch/true-gum-kaugummi-minze-21-g-1129898'
            },
            {
                id: 4,
                name: 'True Gum Pineapple',
                marke: 'True Gum',
                geschmack: 'Pineapple',
                inhaltsstoffe: '...',
                nebenwirkungen: 'Keine bekannten Nebenwirkungen',
                bildUrl: 'https://www.brack.ch/true-gum-kaugummi-minze-21-g-1129898'
            }
        ];

        API.get.mockResolvedValue({ data: fullDbMock });

        render(
            <AuthProvider>
                <BrowserRouter>
                    <KaugummiPage />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(await screen.findByText('Airwaves')).toBeInTheDocument();
        expect(screen.getByText('True Gum Mint')).toBeInTheDocument();
        expect(screen.getByText('True Gum Pineapple')).toBeInTheDocument();
    });



    describe('KaugummiPage Component', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });


        test('1. Lädt und rendert Airwaves Menthol (ID 1)', async () => {
            const mockDbData = [
                {
                    id: 1,
                    name: 'Airwaves',
                    marke: 'Wrigley',
                    geschmack: 'Menthol',
                    inhaltsstoffe: 'Sorbit, Kaumasse, Aromen',
                    nebenwirkungen: 'Kann bei übermäßigem Verzehr abführend wirken',
                    bildUrl: '/Last.png',
                    zuckerfrei: true
                }
            ];

            API.get.mockResolvedValue({ data: mockDbData });

            render(
                <AuthProvider>
                    <BrowserRouter>
                        <KaugummiPage />
                    </BrowserRouter>
                </AuthProvider>
            );

            expect(await screen.findByText('Airwaves')).toBeInTheDocument();
            expect(screen.getByText(/Menthol/i)).toBeInTheDocument();
            expect(screen.getByText(/Wrigley/i)).toBeInTheDocument();
        });








    })
});