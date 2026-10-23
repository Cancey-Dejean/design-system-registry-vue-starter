<script setup lang="ts">
import { DirectionProvider } from ".";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@registry/components/Tabs";
</script>

<template>
  <DirectionProvider direction="rtl">
    <div dir="rtl" class="w-full max-w-sm rounded-lg border p-4">
      <Tabs default-value="account">
        <TabsList aria-label="إعدادات الحساب">
          <TabsTrigger value="account">الحساب</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>
        <TabsContent value="account">إدارة معلومات حسابك</TabsContent>
        <TabsContent value="settings">تخصيص الإعدادات الخاصة بك</TabsContent>
      </Tabs>
    </div>
  </DirectionProvider>
</template>
