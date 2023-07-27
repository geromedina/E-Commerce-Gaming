module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: "AKIAUNQ6L4JAUWESEEQK",
          secretAccessKey: "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",
          region: "sa-east-1",
          params: {
            Bucket: "ecommerce-geromedina",
          },
        },
      },
    },
  },
});
