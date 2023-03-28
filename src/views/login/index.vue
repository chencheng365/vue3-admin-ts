<script setup lang="ts">
import { useRoute } from 'vue-router'
import util from '@/utils/common-util'

const route = useRoute()
let ssoLoginUrl = util.getServerApibyEnv('enzomesaSso')
const redirectUrl = route.query.redirect as string
const origin = window.location.origin
if (redirectUrl) {
  ssoLoginUrl = `${ssoLoginUrl}?redirect_url=${origin + redirectUrl.replace('#', '%23')}?source-id=4&domain=arpa`
} else {
  ssoLoginUrl = `${ssoLoginUrl}?redirect_url=${origin}/dashboard?source-id=4&domain=arpa`
}
window.location.href = ssoLoginUrl
</script>
