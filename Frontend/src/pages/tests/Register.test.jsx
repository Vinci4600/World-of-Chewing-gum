import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import '@testing-library/jest-dom';
import RegistrierungPage from "../RegisterPage.jsx";

// Mock für useNavigate von react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("RegistrierungPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock für fetch global zurücksetzen
        global.fetch = vi.fn();
    });

    test("rendert alle Eingabefelder und Buttons korrekt", () => {
        render(
            <BrowserRouter>
                <RegistrierungPage />
            </BrowserRouter>
        );

        expect(screen.getByRole("heading", { name: /registrierung/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/username eingeben.../i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/^passwort$/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/confirm passwort/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /^registrieren$/i })).toBeInTheDocument();
    });

    test("schaltet die Passwort-Sichtbarkeit um, wenn der 'Show/Hide'-Button geklickt wird", () => {
        render(
            <BrowserRouter>
                <RegistrierungPage />
            </BrowserRouter>
        );

        const passwordInput = screen.getByPlaceholderText(/^passwort$/i);
        const toggleButton = screen.getAllByRole("button", { name: /show/i })[0];

        // Standardmäßig sollte das Feld den Typ 'password' haben
        expect(passwordInput).toHaveAttribute("type", "password");

        // Auf "Show" klicken
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");
        expect(toggleButton).toHaveTextContent(/hide/i);

        // Erneut klicken (zurück zu 'password')
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("zeigt eine Fehlermeldung an, wenn die Passwörter nicht übereinstimmen", async () => {
        render(
            <BrowserRouter>
                <RegistrierungPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/username eingeben.../i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/^passwort$/i), {
            target: { value: "Secret1!" },
        });
        fireEvent.change(screen.getByPlaceholderText(/confirm passwort/i), {
            target: { value: "WrongPassword1!" },
        });

        fireEvent.click(screen.getByRole("button", { name: /^registrieren$/i }));

        // Überprüfen, ob die Fehlermeldung erscheint
        expect(
            await screen.findByText(/passwörter stimmen nicht überein\./i)
        ).toBeInTheDocument();
    });

    test("führt eine erfolgreiche Registrierung durch und navigiert zum Login", async () => {
        // Mock für erfolgreichen API-Call
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        render(
            <BrowserRouter>
                <RegistrierungPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/username eingeben.../i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/^passwort$/i), {
            target: { value: "Secret1!" },
        });
        fireEvent.change(screen.getByPlaceholderText(/confirm passwort/i), {
            target: { value: "Secret1!" },
        });

        fireEvent.click(screen.getByRole("button", { name: /^registrieren$/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "/api/auth/register",
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({
                        username: "testuser",
                        password: "Secret1!",
                        email: "test@example.com",
                    }),
                })
            );
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });
});