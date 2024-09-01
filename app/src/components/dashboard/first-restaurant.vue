<template>
  <div class="mx-auto max-w-3xl px-4">
    <Card>
      <CardHeader>
        <CardTitle>Criando o seu primeiro restaurante</CardTitle>
        <CardDescription
          >Este é o primeiro passo para começar a usar o Ve a
          conta!</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form @submit.prevent="create" class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input v-model="name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>CNPJ</Label>
            <Input v-model="cnpj" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>Endereço</Label>
            <Input v-model="address" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>Telefone</Label>
            <Input v-model="phone" />
          </div>
          <div class="flex justify-end">
            <Button :disabled="!isValid">Criar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script>
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createRestaurant, getUserRestaurants } from "@/utils/restaurant";

export default {
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Label,
    Input,
    Button,
  },
  computed: {
    isValid() {
      return this.name.length > 2;
    },
    account() {
      return this.$store.state.account;
    },
  },
  data() {
    return {
      name: "",
      cnpj: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    async create() {
      if (!this.isValid) return;
      await createRestaurant({
        data: {
          owner: this.account.id,
          name: this.name,
          cnpj: this.cnpj,
          address: this.address,
          phone: this.phone,
        },
      });
      const restaurants = await getUserRestaurants();
      this.$store.commit("setRestaurants", restaurants);
      this.$store.commit("setRestaurant", restaurants[0]);
      this.$store.commit("addToast", {
        description: `Restaurante ${this.name} criado!`,
      });
    },
  },
};
</script>
