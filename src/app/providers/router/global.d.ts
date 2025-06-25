import type { RouteRecordInfo } from 'vue-router'

// Опрелеям типы роутов
export interface RouteNamedMap {
  Users: RouteRecordInfo<'Users', '/users', Record<never, never>, Record<never, never>, never>
  UserDetail: RouteRecordInfo<
    'UserDetail',
    '/users/:id',
    { id: string | number },
    { id: string },
    never
  >
  UserNew: RouteRecordInfo<
    'UserNew',
    '/users/new',
    Record<never, never>,
    Record<never, never>,
    never
  >
  UserEdit: RouteRecordInfo<'UserEdit', '/users/:id/edit', { id: number }, { id: string }, never>
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
