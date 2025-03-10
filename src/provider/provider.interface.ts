export interface IProvider {
	name: string;
	awake: () => void | Promise<void>;
}