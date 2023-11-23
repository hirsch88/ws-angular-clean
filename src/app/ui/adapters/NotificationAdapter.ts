import { balToastController } from '@baloise/design-system-components'
import { NotificationPort } from 'src/app/core/ports/NotificationPort'

export class NotificationAdapter implements NotificationPort {
  success() {
    balToastController.create({
      color: 'success',
      message: 'checkout.notification.success',
      // message: i18n.global.t('checkout.notification.success'),
      duration: 2000,
    })
  }
}
