;; Subscription Contract - Recurring payments on Stacks Mainnet

(define-data-var owner principal 'SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY)

(define-map subscriptions 
  principal 
  {tier: (string-ascii 20), expires-at: uint, amount-paid: uint}
)

(define-constant BASIC_PRICE u100000)    ;; 0.1 STX
(define-constant PRO_PRICE u500000)      ;; 0.5 STX
(define-constant PREMIUM_PRICE u1000000) ;; 1 STX
(define-constant DURATION u4320)         ;; ~30 days in blocks

;; Subscribe to basic tier
(define-public (subscribe-basic)
  (begin
    (try! (stx-transfer? BASIC_PRICE tx-sender (var-get owner)))
    (map-set subscriptions tx-sender {
      tier: "basic",
      expires-at: (+ block-height DURATION),
      amount-paid: BASIC_PRICE
    })
    (ok "basic")
  )
)

;; Subscribe to pro tier
(define-public (subscribe-pro)
  (begin
    (try! (stx-transfer? PRO_PRICE tx-sender (var-get owner)))
    (map-set subscriptions tx-sender {
      tier: "pro",
      expires-at: (+ block-height DURATION),
      amount-paid: PRO_PRICE
    })
    (ok "pro")
  )
)

;; Subscribe to premium tier
(define-public (subscribe-premium)
  (begin
    (try! (stx-transfer? PREMIUM_PRICE tx-sender (var-get owner)))
    (map-set subscriptions tx-sender {
      tier: "premium",
      expires-at: (+ block-height DURATION),
      amount-paid: PREMIUM_PRICE
    })
    (ok "premium")
  )
)

;; Check subscription status
(define-read-only (get-subscription (user principal))
  (map-get? subscriptions user)
)

;; Check if user has active subscription
(define-read-only (is-active (user principal))
  (let ((sub (map-get? subscriptions user)))
    (match sub
      sub-data (> (get expires-at sub-data) block-height)
      false
    )
  )
)

;; Get tier of user
(define-read-only (get-tier (user principal))
  (let ((sub (map-get? subscriptions user)))
    (match sub
      sub-data (if (> (get expires-at sub-data) block-height)
                   (some (get tier sub-data))
                   none)
      none
    )
  )
)
