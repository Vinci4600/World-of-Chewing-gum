import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import KaugummiDetailPage from "../KaugummiDetailPage.jsx";
import API from "../../api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "@testing-library/jest-dom";

// 1. API Mock einrichten
jest.mock("../../api.js", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

// 2. AuthContext Mock
jest.mock("../../context/AuthContext.jsx", () => ({
    __esModule: true,
    useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        __esModule: true,
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Beispiel-Daten
const mockGumData = {
    id: "1",
    name: "Airwaves Menthol",
    marke: "Wrigley",
    geschmack: "Menthol",
    zuckerfrei: true,
    inhaltsstoffe: "Süßungsmittel, Kaumasse",
    herstellungsland: "Deutschland",
    nebenwirkungen: "Kann bei übermäßigem Verzehr abführend wirken.",
    imageUrl: "/images/airwaves.png",
    shopUrl: "https://example.com/shop",
    kommentare: [
        { id: "c1", text: "Sehr erfrischend!", benutzer: { benutzername: "Max" } }
    ],
};

const renderComponent = (id = "1") => {
    return render(
        <MemoryRouter initialEntries={[`/kaugummi/${id}`]}>
            <Routes>
                <Route path="/kaugummi/:id" element={<KaugummiDetailPage />} />
            </Routes>
        </MemoryRouter>
    );
};

describe("KaugummiDetailPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Standardmäßig als eingeloggt setzen
        useAuth.mockReturnValue({ isAuthenticated: true });
    });

    it("zeigt den Ladezustand an, bevor die Daten geladen sind", () => {
        API.get.mockImplementation(() => new Promise(() => {})); // Unendlich schwebender Promise
        renderComponent();

        expect(screen.getByText("Kaugummi wird geladen...")).toBeInTheDocument();
    });

    it("lädt und zeigt die Kaugummi-Details erfolgreich an", async () => {
        API.get.mockResolvedValueOnce({ data: mockGumData });

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText("Marke: Wrigley")).toBeInTheDocument();
            expect(screen.getByText("Geschmack: Menthol")).toBeInTheDocument();
            expect(screen.getByText('heading',{level:1,name:/airwaves mentol/i})).toBeInTheDocument();
            expect(screen.getByText('Wrigley')).toBeInTheDocument();
        });
    });

    it("zeigt eine Fehlermeldung an, wenn der API-Aufruf fehlschlägt", async () => {
        API.get.mockRejectedValueOnce(new Error("Netzwerkfehler"));
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText("Der Kaugummi konnte nicht geladen werden.")).toBeInTheDocument();
        });

        const backBtn = screen.getByRole("button", { name: "Zurück zur Übersicht" });
        fireEvent.click(backBtn);
        expect(mockNavigate).toHaveBeenCalledWith("/kaugummiPage");
    });

    it("leitet zum Login weiter, wenn ein unangemeldeter Benutzer versucht zu kommentieren", async () => {
        useAuth.mockReturnValue({ isAuthenticated: false });
        API.get.mockResolvedValueOnce({ data: mockGumData });

        // window.alert mocken
        const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText("Airwaves Menthol")).toBeInTheDocument();
        });

        const textarea = screen.getByPlaceholderText("Dein Kommentar");
        const submitBtn = screen.getByRole("button", { name: /Kommentar schreiben/i });

        fireEvent.change(textarea, { target: { value: "Toller Kaugummi!" } });
        fireEvent.click(submitBtn);

        expect(alertSpy).toHaveBeenCalledWith("Bitte zuerst anmelden, bevor du einen Kommentar schreibst.");
        expect(mockNavigate).toHaveBeenCalledWith("/login", {
            state: { message: "Bitte melde dich an, um einen Kommentar zu schreiben." }
        });
    });

    it("sendet erfolgreich einen neuen Kommentar und aktualisiert die Liste", async () => {
        API.get.mockResolvedValueOnce({ data: mockGumData });
        const newComment = { id: "c2", text: "Neuer Testkommentar", benutzer: { benutzername: "TestUser" } };
        API.post.mockResolvedValueOnce({ data: newComment });

        renderComponent();

        await waitFor(() => {
            expect(screen.getByText("Airwaves Menthol")).toBeInTheDocument();
        });

        const textarea = screen.getByPlaceholderText("Dein Kommentar");
        const submitBtn = screen.getByRole("button", { name: /Kommentar schreiben/i });

        fireEvent.change(textarea, { target: { value: "Neuer Testkommentar" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(API.post).toHaveBeenCalledWith("/api/kaugummi/1/kommentar", { text: "Neuer Testkommentar" });
            expect(screen.getByText("Kommentar erfolgreich gespeichert.")).toBeInTheDocument();
            expect(screen.getByText("Neuer Testkommentar")).toBeInTheDocument();
        });
    });
});