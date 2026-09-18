
package org.example.backend.dto;


public class ForgotPasswordRequest {
    private String email;



    private String code;
    private String newPassword;
	// Anpassungen für Passwort vergessen
	public ForgotPasswordRequest() {
	}

    public ForgotPasswordRequest(String email, String code, String newPassword) {
        this.email = email;
        this.code = code;
        this.newPassword = newPassword;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
    

    

}