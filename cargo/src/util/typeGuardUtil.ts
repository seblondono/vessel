export const isValue = <T>(value: T | null | undefined): value is T => value != null

export const isEnumValue = <T>(enumType: T): Record<string, (keyString: string) => boolean> => ({
  exists: (keyString: string): boolean => {
    return Object.values(enumType).includes(keyString)
  },
})
