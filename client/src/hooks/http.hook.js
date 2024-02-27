import {useState, useCallback} from 'react'

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    const get = useCallback(async (url, load = true) => {
        load && setLoading(true)
        const time = performance.now()
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const json = await response.json()
            if (!json.status) setError('Ошибка получения JSON')
            if (json.status.err > 0) setError(`[${json.status.err}] ${json.status.message}`)
            load && setLoading(false)
            return json
        } catch (e) {
            setError(e.message)
            load && setLoading(false)
        }
    }, [])

    const post = useCallback(async (url, body, load = true) => {
        load && setSaving(true)
        const time = performance.now()
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body
            })
            const json = await response.json()
            if (!json.status) setError('Ошибка получения JSON')
            if (json.status.err > 0) setError(`[${json.status.err}] ${json.status.message}`)
            load && setSaving(false)
            return true
        } catch (e) {
            setError(e.message)
            load && setSaving(false)
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {get, post, loading, saving, error, clearError}
}
