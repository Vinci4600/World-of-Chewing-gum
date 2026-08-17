package org.example.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        // SCHRITT 1: Authorization Header aus Request holen
        // Beispiel: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I..."
        final String authHeader = request.getHeader("Authorization");

        // SCHRITT 2: Prüfen ob Header existiert und mit "Bearer " startet
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Kein Token gefunden → Filter überspringen,
            // weiter zum nächsten Filter
            // Analogie: Kein Ausweis vorhanden → Person kommt nicht durch
            filterChain.doFilter(request, response);
            return;
        }

        // SCHRITT 3: Token aus dem Header extrahieren
        // "Bearer eyJhbGc..." → "eyJhbGc..." (ohne "Bearer ")
        final String jwt = authHeader.substring(7);

        // SCHRITT 4: Username aus dem Token extrahieren
        // Der Token enthält im Payload: { "sub": "testuser", ... }
        final String username = jwtService.extractUsername(jwt);

        // SCHRITT 5: Prüfen ob User existiert UND
        // noch nicht authentifiziert ist
        // SecurityContextHolder.getContext()
        //     .getAuthentication() == null bedeutet:
        // "Dieser User ist noch nicht eingeloggt in diesem Request"
        if (username != null && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            // SCHRITT 6: User-Details aus Datenbank laden
            // UserDetailsService ruft AppUserRepository.findByUsername() auf
            UserDetails userDetails = userDetailsService
                    .loadUserByUsername(username);

            // SCHRITT 7: Token validieren (Signatur + Ablaufdatum prüfen)
            if (jwtService.validateToken(jwt, username)) {

                // SCHRITT 8: Authentication Object erstellen
                // Das ist wie ein "interner Ausweis" für Spring Security
                // Sagt: "Dieser User ist authentifiziert und hat diese Rollen"
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,   // Principal (der User)
                                null,          // Credentials (brauchen wir nicht mehr)
                                userDetails.getAuthorities()
                                // Rollen (ROLE_ADMIN, ROLE_PLAYER)
                        );

                // SCHRITT 9: Request-Details hinzufügen
                //            (IP-Adresse, Session-ID, etc.)
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // SCHRITT 10: User in SecurityContext setzen
                // Ab jetzt weiss Spring Security: "Dieser User ist eingeloggt!"
                // Alle weiteren Checks (@PreAuthorize, .authenticated())
                // funktionieren jetzt!
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // SCHRITT 11: Weiter zum nächsten Filter in der Chain
        // Der Request geht jetzt weiter zu SecurityConfig, dann zum Controller
        filterChain.doFilter(request, response);
    }
}
