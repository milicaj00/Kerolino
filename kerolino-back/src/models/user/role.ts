export enum Role {
    admin,
    kupac,
    prodavac
}

export type RoleString = keyof typeof Role;