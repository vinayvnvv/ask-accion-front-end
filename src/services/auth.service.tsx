export interface IProfile {
	email: string;
	familyName: string;
	givenName: string;
	googleId: string;
	imageUrl: string;
	name: string;
}

class AuthService {
	private storageKey: string = 'ask_accion_auth_key';
	public setAuth(profile: IProfile) {
		localStorage.setItem(this.storageKey, JSON.stringify(profile));
	}
	public getAuth() {
		return JSON.parse(localStorage.getItem(this.storageKey) || "{}");
	}
	public isAuth() {
		return ( localStorage.getItem(this.storageKey) ? true : false );
	}
	public removeAuth() {
		localStorage.removeItem(this.storageKey);
	}
}

export const Auth = new AuthService();