import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import KaugummiAddPage from "../KaugummiAddPage";
import API from "../../api.js";

// Vitest Mock anstelle von jest.mock
jest.mock("../../api.js", () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
    },
}));

describe("KaugummiAddPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("rendert das Formular mit allen Inputs und dem Submit-Button", () => {
        render(<KaugummiAddPage />);

        expect(screen.getByRole("heading", { name: /kaugummi hinzufügen/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    test("aktualisiert Formularwerte bei Benutzereingabe und sendet Daten per API.post ab", async () => {
        API.post.mockResolvedValueOnce({ data: { id: 1, name: "Mentos Mint" } });

        render(<KaugummiAddPage />);

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Mentos Mint" } });
        fireEvent.change(screen.getByLabelText(/bild-url/i), { target: { value: "https://example.com/image.png" } });
        fireEvent.change(screen.getByLabelText(/marke/i), { target: { value: "Mentos" } });
        fireEvent.change(screen.getByLabelText(/geschmack/i), { target: { value: "Spearmint" } });
        fireEvent.click(screen.getByLabelText(/zuckerfrei/i));
        fireEvent.change(screen.getByLabelText(/inhaltsstoffe/i), { target: { value: "Sorbit, Aroma" } });
        fireEvent.change(screen.getByLabelText(/shopurl/i), { target: { value: "https://shop.com" } });
        fireEvent.change(screen.getByPlaceholderText("Herstellungsland"), { target: { value: "Schweiz" } });
        fireEvent.change(screen.getByPlaceholderText("Nebenwirkungen"), { target: { value: "Keine" } });

        fireEvent.click(screen.getByRole("button", { name: /kaugummi hinzufügen/i }));

        await waitFor(() => {
            expect(API.post).toHaveBeenCalledWith("/api/kaugummi/add", {
                name: "Mentos Mint",
                imageUrl: "https://example.com/image.png",
                marke: "Mentos",
                geschmack: "Spearmint",
                zuckerfrei: true,
                inhaltsstoffe: "Sorbit, Aroma",
                shopUrl: "https://shop.com",
                herstellungsland: "Schweiz",
                nebenwirkungen: "Keine",
            });
        });
    });

    test("behandelt Fehler bei fehlgeschlagenem API-Aufruf ab", async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        API.post.mockRejectedValueOnce(new Error("Netzwerkfehler"));

        render(<KaugummiAddPage />);

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText(/marke/i), { target: { value: "TestMarke" } });
        fireEvent.change(screen.getByLabelText(/geschmack/i), { target: { value: "TestGeschmack" } });
        fireEvent.change(screen.getByLabelText(/shopurl/i), { target: { value: "https://test.com" } });
        fireEvent.change(screen.getByPlaceholderText("Herstellungsland"), { target: { value: "CH" } });
        fireEvent.change(screen.getByPlaceholderText("Nebenwirkungen"), { target: { value: "Keine" } });

        fireEvent.click(screen.getByRole("button", { name: /kaugummi hinzufügen/i }));

        await waitFor(() => {
            expect(API.post).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith("Fehler:", expect.any(Error));
        });

        consoleSpy.mockRestore();
    });
});