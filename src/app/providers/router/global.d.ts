import type { RouteRecordInfo } from 'vue-router'

// Опрелеям типы роутов
export interface RouteNamedMap {
  Users: RouteRecordInfo<'Users', '/users', Record<never, never>, Record<never, never>, never>
  UserDetail: RouteRecordInfo<'UserDetail', '/users/:id', { id: number }, { id: string }, never>
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
