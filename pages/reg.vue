<script setup lang="ts">
import workerImage from "~/assets/workerImage.png";
import employerImage from "~/assets/employerImage.png";

const router = useRouter();
const currentRole = ref<string | null>(null);

const roles = [
  { id: "worker", name: "Исполнитель", image: workerImage, pros: ["может откликаться"], cons: ["не может создавать"] },
  { id: "employer", name: "Заказчик", image: employerImage, pros: ["может создавать"], cons: ["не может откликаться"] },
];

const selectRole = (roleId: string) => {
  if (roleId === "guest") {
    router.push("/");
    return;
  }
  currentRole.value = roleId;
};
</script>

<template>
  <div class="role-select">
    <div class="role-select__wrap">
      <div v-if="!currentRole" class="role-select__picker">
        <UITitle h2 class="role-select__title">
          Выберите роль для регистрации
        </UITitle>
        <div class="role-select__grid">
          <article
v-for="role in roles" :key="role.id" class="role-card"
            :class="{ 'role-card--active': currentRole === role.id }">
            <button type="button" class="role-card__body" @click="selectRole(role.id)">
              <img :src="role.image" :alt="role.name" class="role-card__image" >
              <h3 class="role-card__name">{{ role.name }}</h3>

              <div class="role-card__lists">
                <div class="role-card__pros">
                  <ul class="role-card__list">
                    <li v-for="pro in role.pros" :key="pro" class="role-card__list-item">
                      <span class="role-card__sign">+</span>
                      <span class="role-card__text">{{ pro }}</span>
                    </li>
                  </ul>
                </div>

                <div class="role-card__cons">
                  <ul class="role-card__list">
                    <li v-for="con in role.cons" :key="con" class="role-card__list-item">
                      <span class="role-card__sign">−</span>
                      <span class="role-card__text">{{ con }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </button>

            <div class="role-card__footer">
              <button type="button" class="role-card__select" @click="selectRole(role.id)">Выбор</button>
            </div>
          </article>
        </div>

        <a href="#" class="role-select__guest-link" @click.prevent="selectRole('guest')">продолжить без регистрации</a>
      </div>

      <div v-else class="role-select__form">
        <p class="role-select__chosen">
          Роль:
          <span class="role-select__chosen-name">
            {{ currentRole === 'worker' ? 'Исполнитель' : currentRole === 'employer' ? 'Заказчик' : 'Гость' }}
          </span>
        </p>

        <WorkerRegForm v-if="currentRole === 'worker'" @reset-role="currentRole = null" />
        <EmployerRegForm v-else-if="currentRole === 'employer'" @reset-role="currentRole = null" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$lg: 1024px;
$md: 768px;
$sm: 432px;

.role-select {
  min-height: 100vh;

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px 24px;
  }

  &__picker {
    align-items: center;
    width: 100%;
    max-width: 1200px;
    background: #fff;
    padding: 48px;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(16, 24, 40, 0.06);
    border: 1px solid var(--neutral-200);
  }

  &__title {
    text-align: center;
    margin-bottom: 28px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  &__guest-link {
    text-align: center;
    width: 100%;
    display: inline-block;
    margin-top: 24px;
    color: var(--neutral-800);
    text-decoration: underline;
  }

  &__form {
    align-items: center;
    width: 100%;
    max-width: 1200px;
    background: #fff;
    padding: 48px;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(16, 24, 40, 0.06);
    border: 1px solid var(--neutral-200);
  }

  &__chosen {
    text-align: center;
    color: var(--neutral-800);
    margin-bottom: 16px;
    font-size: 16px;

    &-name {
      font-weight: 600;
      text-transform: capitalize;
      color: var(--neutral-900);
    }
  }
}

.role-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid var(--neutral-200);
  overflow: hidden;
  transition: transform .22s ease, box-shadow .22s ease;
  background: #fff;

  &--active {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(47, 42, 137, 0.12);
  }

  &__body {
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
  }

  &__image {
    width: 160px;
    height: 160px;
    border-radius: 25%;
    object-fit: cover;
    margin-bottom: 20px;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--neutral-800);
  }

  &__lists {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
  }

  &__pros,
  &__cons {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
  }

  &__pros {
    background: var(--primary-200);
    color: var(--primary-800);
  }

  &__cons {
    background: var(--primary-50);
    color: var(--primary-600);
  }

  &__list {
    margin: 0;
    padding: 0;
  }

  &__list-item {
    list-style: none;
    display: flex;
    align-items: flex-start;
    font-size: 15px;
    margin-bottom: 6px;
  }

  &__sign {
    font-weight: 700;
    margin-right: 8px;
    color: var(--primary-700);
  }

  &__text {
    color: inherit;
  }

  &__footer {
    padding: 12px;
    display: flex;
    justify-content: center;
  }

  &__select {
    width: 160px;
    padding: 10px 14px;
    border-radius: 10px;
    background: var(--primary-500);
    color: #fff;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background .15s;
  }

  &__select:hover {
    background: var(--primary-600);
  }
}

@media (max-width: $lg) {
  .role-select {
    &__wrap {
      padding: 40px 16px;
    }

    &__picker {
      max-width: 980px;
      padding: 40px;
    }

    &__grid {
      gap: 16px;
    }

    &__title {
      margin-bottom: 24px;
    }

    &__form {
      padding: 24px;
    }
  }

  .role-card {
    &__body {
      padding: 16px;
    }

    &__image {
      width: 128px;
      height: 128px;
      margin-bottom: 16px;
    }

    &__select {
      width: 144px;
      padding: 10px 14px;
    }
  }
}

@media (max-width: $md) {
  .role-select {
    &__wrap {
      padding: 20px 12px;
    }

    &__picker {
      max-width: 720px;
      padding: 20px;
      border-radius: 16px;
    }

    &__grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    &__title {
      margin-bottom: 18px;
    }

    &__form {
      max-width: 720px;
      padding: 16px;
      border-radius: 12px;
    }
  }

  .role-card {
    &__body {
      padding: 12px;
    }

    &__name {
      font-size: 16px;
      margin-bottom: 8px;
    }

    &__lists {
      gap: 6px;
      margin-bottom: 8px;
    }

    &__list-item {
      font-size: 14px;
    }

    &__select {
      width: 25%;
      padding: 9px 12px;
    }

    &__footer {
      padding: 8px;
    }
  }
}

@media (max-width: $sm) {
  .role-select {
    &__picker {
      max-width: 100%;
      border-radius: 9px;
    }

    &__grid {
      gap: 8px;
    }

    &__title {
      margin-bottom: 12px;
    }

    &__form {
      padding: 18px 9px;
    }
  }

  .role-card {
    &__body {
      padding: 8px;
    }

    &__image {
      width: 84px;
      height: 84px;
      margin-bottom: 8px;
    }

    &__name {
      font-size: 15px;
      margin-bottom: 6px;
    }

    &__lists {
      width: 100%;
    }

    &__list-item {
      font-size: 13px;
    }

    &__select {
      padding: 7px 10px;
      font-size: 14px;
      width: 100%;
    }
  }
}
</style>
