<template>
  <div
    class="fixed top-0 z-30 bottom-0 left-0 right-0 bg-green-500 flex items-center justify-center"
  >
    <Card class="w-96 shadow-md">
      <div class="flex justify-center py-6">
        <Logo />
      </div>
      <CardHeader>
        <CardTitle>Oi! Tudo bem?</CardTitle>
        <CardDescription>Diz o seu nome pra gente?</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="save" class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input v-model="name" />
          </div>
          <div class="flex justify-end">
            <Button :disabled="!isValid" class="flex gap-2">
              <Loading v-if="loading" />
              Salvar
            </Button>
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
import { getAccount, updateAccount } from "@/utils/account";
import Logo from "@/components/ui/logo.vue";
import Loading from "@/components/ui/loading.vue";

export default {
  components: {
    Loading,
    Logo,
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
      loading: false,
    };
  },
  methods: {
    async save() {
      if (!this.isValid) return;
      this.loading = true;
      await updateAccount({
        id: this.account.id,
        data: {
          name: this.name,
        },
      });
      await getAccount({
        id: this.account.id,
      });
    },
  },
};
</script>
